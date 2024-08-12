import "@testing-library/jest-dom"; // for additional matchers
import { fireEvent, render, screen } from "@testing-library/react";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { Button } from "~/components/base/atoms/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

// Mock ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Sample data for the BarChart
const data = [
  { goal: 400 },
  { goal: 300 },
  { goal: 200 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 239 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 349 },
];

const DrawerComponent = () => {
  const [goal, setGoal] = useState(350);

  const onClick = (adjustment: number) => {
    setGoal((prevGoal) => Math.max(200, Math.min(400, prevGoal + adjustment)));
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-10)}
                disabled={goal <= 200}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div
                  data-testid="goal-display"
                  className="text-7xl font-bold tracking-tighter"
                >
                  {goal}
                </div>
                <div className="text-muted-foreground text-[0.70rem] uppercase">
                  Calories/day
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(10)}
                disabled={goal >= 400}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Bar
                    dataKey="goal"
                    style={
                      {
                        fill: "hsl(var(--foreground))",
                        opacity: 0.9,
                      } as React.CSSProperties
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

describe("DrawerComponent", () => {
  test("should open drawer and update goal count on button clicks", () => {
    render(<DrawerComponent />);

    // Open the drawer
    const openDrawerButton = screen.getByRole("button", {
      name: /open drawer/i,
    });
    fireEvent.click(openDrawerButton);

    // Ensure the drawer content is now visible
    const goalDisplay = screen.getByTestId("goal-display");
    expect(goalDisplay).toHaveTextContent("350");

    // Find and click the increase button
    const increaseButton = screen.getByRole("button", { name: /increase/i });
    fireEvent.click(increaseButton);

    // Check if the goal count has increased
    expect(goalDisplay).toHaveTextContent("360");

    // Find and click the decrease button
    const decreaseButton = screen.getByRole("button", { name: /decrease/i });
    fireEvent.click(decreaseButton);

    // Check if the goal count has decreased
    expect(goalDisplay).toHaveTextContent("350");

    // Click decrease button until goal is at minimum (200)
    for (let i = 0; i < 15; i++) {
      fireEvent.click(decreaseButton);
    }
    expect(decreaseButton).toBeDisabled(); // Goal should be clamped at 200

    // Click increase button until goal is at maximum (400)
    for (let i = 0; i < 20; i++) {
      fireEvent.click(increaseButton);
    }
    expect(increaseButton).toBeDisabled(); // Goal should be clamped at 400
  });
});
