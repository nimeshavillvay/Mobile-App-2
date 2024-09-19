import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SpecialNoticesBar from "../special-notices-bar";

describe("SpecialNoticesBar", () => {
  const mockNoticeText = "This is a test notice";

  test("does not animate when text fits container", () => {
    render(<SpecialNoticesBar noticeText={mockNoticeText} />);

    expect(screen.getByText(mockNoticeText)).not.toHaveClass("animate-marquee");
  });
});
