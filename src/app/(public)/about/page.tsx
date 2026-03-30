import { Card, CardContent } from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-light text-night-800 dark:text-night-100 mb-8">
          About Us
        </h1>
        <Card variant="glass" className="mb-8">
          <CardContent>
            <p className="text-lg text-night-600 dark:text-night-300 leading-relaxed mb-6">
              Welcome to Yuuishikii website — a creative space where design meets functionality. We specialize in crafting minimalist, atmospheric digital experiences that leave a lasting impression.
            </p>
            <p className="text-lg text-night-600 dark:text-night-300 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card variant="default">
            <CardContent>
              <h3 className="text-xl font-semibold text-night-800 dark:text-night-100 mb-3">
                Our Vision
              </h3>
              <p className="text-night-600 dark:text-night-400 mb-4">
                To create digital experiences that feel like breathing — natural, effortless, and beautiful.
              </p>
              <p className="text-night-600 dark:text-night-400">
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
              </p>
            </CardContent>
          </Card>
          <Card variant="default">
            <CardContent>
              <h3 className="text-xl font-semibold text-night-800 dark:text-night-100 mb-3">
                Our Approach
              </h3>
              <p className="text-night-600 dark:text-night-400 mb-4">
                Minimalist design with maximum impact. Every pixel serves a purpose.
              </p>
              <p className="text-night-600 dark:text-night-400">
                Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card variant="glass" className="mb-8">
          <CardContent>
            <h3 className="text-2xl font-light text-night-800 dark:text-night-100 mb-4">
              Our History
            </h3>
            <div className="space-y-4 text-night-600 dark:text-night-300 leading-relaxed">
              <p>
                Phasellus vulputate magna. Ut tincidunt. Morbi non odio. Praesent bibendum, magna id egestas rutrum, erat lacus ultrices dolor, nec semper odio mi quis est. Nullam nonummy tincidunt eros. Etiam eu leo a nulla varius fermentum.
              </p>
              <p>
                Integer in magna. Donec nisl felis, luctus eleifend, sodales nec, auctor eget, nonummy a, nisl. Nam ligula purus, semper in, interdum rutrum, facilisis convallis, odio. Suspendisse potenti. Nam non sem. Nulla facilisi.
              </p>
              <p>
                Aliquam quam lectus, imperdiet vel, interdum quis, condimentum vel, ipsum. Aliquam lorem purus, bibendum a, feugiat et, pellentesque a, lorem. Etiam pretium justo sed erat. Cras ac eros nec urna egestas hendrerit.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
