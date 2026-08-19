"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Chess, type Square, type Move } from "chess.js";

const PIECES: Record<string, string> = {
  wk: "♔", wq: "♕", wr: "♖", wb: "♗", wn: "♘", wp: "♙",
  bk: "♚", bq: "♛", br: "♜", bb: "♝", bn: "♞", bp: "♟",
};

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const RANKS = ["8", "7", "6", "5", "4", "3", "2", "1"];

const ELO_MIN = 800;
const ELO_MAX = 3190;

function getEloLabel(elo: number): string {
  if (elo < 1000) return "Beginner";
  if (elo < 1400) return "Casual";
  if (elo < 1800) return "Intermediate";
  if (elo < 2200) return "Advanced";
  if (elo < 2800) return "Expert";
  return "Maximum";
}

export default function ChessPage() {
  const gameRef = useRef(new Chess());
  const engineRef = useRef<Worker | null>(null);

  const [, forceRender] = useState(0);
  const rerender = () => forceRender((n) => n + 1);

  const [selected, setSelected] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<Move[]>([]);
  const [status, setStatus] = useState("Your turn");
  const [playerColor, setPlayerColor] = useState<"w" | "b">("w");
  const [elo, setElo] = useState(1600);
  const [engineThinking, setEngineThinking] = useState(false);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [evalScore, setEvalScore] = useState<number | null>(null);
  const [evalMate, setEvalMate] = useState<number | null>(null);

  const g = gameRef.current;
  const board = g.board();

  const updateStatus = useCallback(() => {
    const game = gameRef.current;
    if (game.isCheckmate()) {
      const winner = game.turn() === "w" ? "Black" : "White";
      setStatus(`Checkmate — ${winner} wins`);
      setGameOver(true);
    } else if (game.isDraw()) {
      setStatus("Draw");
      setGameOver(true);
    } else if (game.isStalemate()) {
      setStatus("Stalemate — Draw");
      setGameOver(true);
    } else if (game.isCheck()) {
      setStatus(`${game.turn() === "w" ? "White" : "Black"} is in check`);
    } else {
      setStatus(`${game.turn() === "w" ? "White" : "Black"} to move`);
    }
  }, []);

  // Init Stockfish 18
  useEffect(() => {
    try {
      const engine = new Worker("/stockfish-18-lite-single.js");
      engine.onmessage = (e) => {
        const msg = typeof e.data === "string" ? e.data : "";
        if (msg.startsWith("info") && msg.includes("score")) {
          const cpMatch = msg.match(/score cp (-?\d+)/);
          const mateMatch = msg.match(/score mate (-?\d+)/);
          if (mateMatch) {
            setEvalMate(parseInt(mateMatch[1]));
            setEvalScore(null);
          } else if (cpMatch) {
            const cp = parseInt(cpMatch[1]);
            const sideToMove = gameRef.current.turn();
            setEvalScore(sideToMove === "w" ? cp : -cp);
            setEvalMate(null);
          }
        }
        if (msg.startsWith("bestmove")) {
          const move = msg.split(" ")[1];
          if (move && move !== "(none)" && !gameRef.current.isGameOver()) {
            const result = gameRef.current.move(move);
            if (result) {
              setMoveHistory((h) => [...h, result.san]);
              updateStatus();
              rerender();
            }
          }
          setEngineThinking(false);
        }
      };
      engine.postMessage("uci");
      engine.postMessage("isready");
      engineRef.current = engine;
    } catch {
      // Stockfish unavailable
    }
    return () => engineRef.current?.terminate();
  }, [updateStatus]);

  const engineMove = useCallback(() => {
    const game = gameRef.current;
    if (game.isGameOver() || game.turn() === playerColor) return;
    const engine = engineRef.current;
    if (!engine) {
      const moves = game.moves({ verbose: true });
      if (moves.length > 0) {
        const random = moves[Math.floor(Math.random() * moves.length)];
        const result = game.move(random.san);
        if (result) {
          setMoveHistory((h) => [...h, result.san]);
          updateStatus();
          rerender();
        }
      }
      return;
    }
    setEngineThinking(true);
    engine.postMessage("ucinewgame");
    engine.postMessage("setoption name UCI_LimitStrength value true");
    engine.postMessage(`setoption name UCI_Elo value ${elo}`);
    engine.postMessage(`position fen ${game.fen()}`);
    engine.postMessage("go depth 15");
  }, [playerColor, elo, updateStatus]);

  const handleSquareClick = (square: Square) => {
    const game = gameRef.current;
    if (game.isGameOver() || engineThinking) return;
    if (game.turn() !== playerColor) return;

    // Execute legal move
    if (selected) {
      const move = legalMoves.find((m) => m.to === square);
      if (move) {
        const result = game.move(move.san);
        if (result) {
          setMoveHistory((h) => [...h, result.san]);
          setSelected(null);
          setLegalMoves([]);
          updateStatus();
          rerender();
          setTimeout(() => engineMove(), 50);
          return;
        }
      }
    }

    // Select piece
    const piece = game.get(square);
    if (piece && piece.color === playerColor) {
      setSelected(square);
      setLegalMoves(game.moves({ square, verbose: true }));
    } else {
      setSelected(null);
      setLegalMoves([]);
    }
  };

  const resetGame = () => {
    gameRef.current.reset();
    setSelected(null);
    setLegalMoves([]);
    setMoveHistory([]);
    setGameOver(false);
    setEngineThinking(false);
    setEvalScore(null);
    setEvalMate(null);
    setStatus("Your turn");
    rerender();
  };

  const flipBoard = () => {
    setPlayerColor((c) => (c === "w" ? "b" : "w"));
    setSelected(null);
    setLegalMoves([]);
    setTimeout(() => engineMove(), 100);
  };

  const isHighlighted = (file: number, rank: number) => {
    const square = `${FILES[file]}${RANKS[rank]}` as Square;
    if (selected === square) return "selected";
    if (legalMoves.some((m) => m.to === square)) return "move";
    return null;
  };

  const isLastMove = (file: number, rank: number) => {
    const history = gameRef.current.history({ verbose: true });
    if (history.length === 0) return false;
    const last = history[history.length - 1];
    const square = `${FILES[file]}${RANKS[rank]}`;
    return last.from === square || last.to === square;
  };

  const displayRanks = playerColor === "w" ? RANKS : [...RANKS].reverse();
  const displayFiles = playerColor === "w" ? FILES : [...FILES].reverse();

  return (
    <div className="min-h-[calc(100vh-5rem)] py-12 px-4 md:px-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-light text-white mb-3 tracking-tight">Chess</h1>
        <p className="text-neutral-400 font-light">Play against Stockfish AI in your browser.</p>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 items-start justify-center">
        {/* Board */}
        <div className="flex flex-col items-center">
          {/* File labels */}
          <div className="flex">
            <div className="w-8" />
            {displayFiles.map((f) => (
              <div key={f} className="w-[52px] h-5 flex items-center justify-center text-[10px] font-mono text-neutral-600">
                {f}
              </div>
            ))}
          </div>

          <div className="flex">
            {/* Rank labels */}
            <div className="flex flex-col">
              {displayRanks.map((r) => (
                <div key={r} className="w-8 h-[52px] flex items-center justify-center text-[10px] font-mono text-neutral-600">
                  {r}
                </div>
              ))}
            </div>

            {/* Eval bar */}
            {(() => {
              const boardH = 416;
              let whitePercent = 50;
              if (evalMate !== null) {
                whitePercent = evalMate > 0 ? 97 : 3;
              } else if (evalScore !== null) {
                whitePercent = Math.round(50 + (Math.atan(evalScore / 200) / (Math.PI / 2)) * 48);
              }
              const blackPercent = 100 - whitePercent;
              const displayEval = evalMate !== null
                ? `M${Math.abs(evalMate)}`
                : evalScore !== null
                ? (evalScore >= 0 ? "+" : "") + (evalScore / 100).toFixed(1)
                : "—";
              const isFlipped = playerColor === "b";
              return (
                <div className="relative w-5 rounded overflow-hidden mx-1" style={{ height: boardH }}>
                  <div className="absolute inset-0 bg-neutral-800" />
                  <div
                    className="absolute left-0 right-0 bg-white transition-all duration-300"
                    style={{ height: `${isFlipped ? blackPercent : whitePercent}%`, bottom: 0 }}
                  />
                  <div
                    className="absolute inset-x-0 flex items-center justify-center text-[9px] font-mono font-bold z-10"
                    style={{
                      top: isFlipped ? `${blackPercent - 6}%` : `${100 - whitePercent - 6}%`,
                      color: (isFlipped ? blackPercent : whitePercent) > 55 ? "black" : "white",
                    }}
                  >
                    {displayEval}
                  </div>
                </div>
              );
            })()}

            {/* Board */}
            <div className="border border-neutral-700 rounded-lg overflow-hidden">
              {displayRanks.map((rank) => (
                <div key={rank} className="flex">
                  {displayFiles.map((file) => {
                    const square = `${file}${rank}` as Square;
                    const rankIdx = RANKS.indexOf(rank);
                    const fileIdx = FILES.indexOf(file);
                    const piece = board[rankIdx]?.[fileIdx];
                    const highlight = isHighlighted(fileIdx, rankIdx);
                    const lastMove = isLastMove(fileIdx, rankIdx);
                    const isDark = (fileIdx + rankIdx) % 2 === 1;

                    return (
                      <button
                        key={square}
                        onClick={() => handleSquareClick(square)}
                        className={`w-[52px] h-[52px] flex items-center justify-center text-3xl relative transition-colors ${
                          highlight === "selected"
                            ? "bg-white/20"
                            : highlight === "move"
                            ? "bg-white/10"
                            : lastMove
                            ? isDark ? "bg-neutral-700/50" : "bg-neutral-600/30"
                            : isDark
                            ? "bg-neutral-800"
                            : "bg-neutral-700/40"
                        }`}
                      >
                        {highlight === "move" && (
                          <div className="absolute w-3 h-3 rounded-full bg-white/30" />
                        )}
                        {piece && (
                          <span className={`select-none leading-none ${piece.color === "w" ? "drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]" : ""}`}>
                            {PIECES[`${piece.color}${piece.type}`]}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="flex flex-col gap-4 w-full lg:w-64">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4">
            <div className="text-xs font-mono text-neutral-600 uppercase tracking-widest mb-2">Status</div>
            <div className={`text-sm font-mono ${gameOver ? "text-white font-medium" : "text-neutral-300"}`}>
              {engineThinking ? "Engine thinking..." : status}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button onClick={resetGame} className="w-full px-4 py-3 rounded-xl text-sm font-medium bg-white text-black hover:bg-neutral-200 transition-all">
              New Game
            </button>
            <button onClick={flipBoard} className="w-full px-4 py-3 rounded-xl text-sm font-medium bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 transition-all">
              Flip Board
            </button>
          </div>

          {/* ELO Slider */}
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-mono text-neutral-600 uppercase tracking-widest">Engine ELO</div>
              <div className="text-sm font-mono text-white">{elo}</div>
            </div>
            <input
              type="range"
              min={ELO_MIN}
              max={ELO_MAX}
              value={elo}
              onChange={(e) => setElo(Number(e.target.value))}
              className="w-full h-1 bg-neutral-800 rounded-full appearance-none cursor-pointer accent-white"
            />
            <div className="flex justify-between mt-2">
              <span className="text-[9px] font-mono text-neutral-600">{ELO_MIN}</span>
              <span className="text-[9px] font-mono text-neutral-500">{getEloLabel(elo)}</span>
              <span className="text-[9px] font-mono text-neutral-600">{ELO_MAX}</span>
            </div>
          </div>

          {/* Move History */}
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 flex-1 min-h-[200px] max-h-[300px] overflow-auto">
            <div className="text-xs font-mono text-neutral-600 uppercase tracking-widest mb-2">Moves</div>
            <div className="font-mono text-xs text-neutral-400 space-y-0.5">
              {moveHistory.length === 0 && (
                <div className="text-neutral-600 italic">No moves yet</div>
              )}
              {moveHistory.reduce<string[][]>((acc, move, i) => {
                if (i % 2 === 0) acc.push([`${Math.floor(i / 2) + 1}. ${move}`]);
                else acc[acc.length - 1].push(move);
                return acc;
              }, []).map((pair, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-neutral-600 w-8">{pair[0]?.split(" ")[0]}</span>
                  <span className="w-12">{pair[0]?.split(" ")[1]}</span>
                  <span className="w-12">{pair[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
