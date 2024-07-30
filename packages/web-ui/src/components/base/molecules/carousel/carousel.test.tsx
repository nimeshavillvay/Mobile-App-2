import "@testing-library/react";
import { render, screen } from "@testing-library/react";
import { type EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Carousel, CarouselContent, CarouselHeader } from "./carousel";

const MockPrevIcon = () => <svg data-testid="prev-icon" />;
const MockNextIcon = () => <svg data-testid="next-icon" />;

// Mock the useEmblaCarousel hook
jest.mock("embla-carousel-react", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseEmblaCarousel = useEmblaCarousel as jest.MockedFunction<
  typeof useEmblaCarousel
>;

describe("Carousel", () => {
  beforeEach(() => {
    // Reset the mock before each test
    mockUseEmblaCarousel.mockReset();
  });

  test("renders carousel with header and content", () => {
    mockUseEmblaCarousel.mockReturnValue([jest.fn(), undefined]);
    render(
      <Carousel>
        <CarouselHeader>Header</CarouselHeader>
        <CarouselContent
          options={{ dragFree: true, axis: "x" } as EmblaOptionsType}
          PrevIcon={MockPrevIcon}
          NextIcon={MockNextIcon}
          orientation="horizontal"
          buttonsPosition="side"
        >
          <div>Item 1</div>
          <div>Item 2</div>
        </CarouselContent>
      </Carousel>,
    );

    expect(screen.getByText("Header")).toBeDefined();
    expect(screen.getByText("Item 1")).toBeDefined();
    expect(screen.getByText("Item 2")).toBeDefined();
  });
});
