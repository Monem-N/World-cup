# Itinerary Page Redesign Plan

This document outlines the plan to transform the itinerary page layout to resemble the provided image, incorporating a two-column structure for larger screens and a stacked layout for mobile, with specific attention to the map view styling on mobile devices.

## Detailed Plan:

1.  **Understand the Current Structure:** Examine the code in the relevant files, particularly `app/routes/itinerary.$date.tsx`, `app/routes/itinerary.$date/components/Timeline/`, and `app/routes/itinerary.$date/components/MapView.tsx`, to understand how the current layout is structured and how the components are implemented.
2.  **Modify the Main Layout:** Update the main layout file (`app/routes/itinerary.$date.tsx`) to create a two-column structure for larger screens. The left column will house the timeline and activity list, and the right column will contain the map view. This will likely involve using CSS layout techniques like Flexbox or Grid.
3.  **Implement Responsive Design:** Add CSS media queries or use a responsive framework to adjust the layout for smaller screens. On mobile devices, the two columns will likely stack vertically, with the timeline and activity list appearing above the map view. Ensure that elements resize and reflow appropriately for optimal viewing on mobile.
4.  **Refine Map View Styling on Mobile:** Specifically address the styling of the map view when the page is displayed on mobile devices. This might involve adjusting its height, ensuring touch interactions are smooth, or optimizing the display of markers and information windows for smaller screens.
5.  **Integrate Timeline and Cards:** Place the existing timeline and activity list components within the left column of the new layout (or the top section on mobile). Review the styling of the timeline and cards to ensure they fit well within their containers and make any necessary adjustments to match the visual style of the image, while preserving any aspects you want to keep from the current design.
6.  **Integrate Map View:** Place the map view component (`app/routes/itinerary.$date/components/MapView.tsx`) within the right column (or the bottom section on mobile). Ensure the map is configured to display markers for all the locations in the day's itinerary and that it scales correctly within its container on all screen sizes.
7.  **Refine Overall Styling:** Make any further styling adjustments to the overall page and individual components to ensure a cohesive look and feel that aligns with the image you provided and is fully responsive.

## Proposed Layout Structure:

```mermaid
graph LR
    A[Itinerary Page ($date)] --> B(Desktop Layout)
    A --> C(Mobile Layout)
    B --> D[Left Section]
    B --> E[Right Section]
    D --> F[Timeline & Activity List]
    E --> G[Map View]
    C --> H[Top Section]
    C --> I[Bottom Section]
    H --> J[Timeline & Activity List]
    I --> K[Map View]