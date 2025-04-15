export enum Direction {
  top = "top",
  right = "right",
  bottom = "bottom",
  left = "left",
  leftTop = "left top",
  rightTop = "right top",
  leftBottom = "left bottom",
  rightBottom = "right bottom",
}
export enum Position {
  top = "从下到上",
  right = "从左到右",
  bottom = "从上到下",
  left = "从右到左",
  leftTop = "从右下到左上",
  rightTop = "从左下到右上",
  leftBottom = "从右上到左下",
  rightBottom = "从左上到右下",
}
export interface DirectionOption {
  label: string;
  value: Direction;
}
export interface Effect {
  id: number;
  title: string;
  componentName: string;
}
