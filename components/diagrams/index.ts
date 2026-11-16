import type { ComponentType } from "react";
import type { DiagramKey } from "@/data/products";
import { UartBlockDiagram } from "./UartBlockDiagram";

/** Maps `product.diagram` keys (data/products.ts) to diagram components. */
export const diagrams: Record<DiagramKey, ComponentType> = {
  uart: UartBlockDiagram,
};
