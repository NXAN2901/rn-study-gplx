"use strict";
export default class ButtonModel {
  constructor(
    text: string,
    textColor: string,
    bgColor: string,
    onPressed: (input) => {}
  ) {
    this.text = text;
    this.textColor = textColor;
    this.bgColor = bgColor;
    this.onPressed = onPressed;
  }

  getText = (): string => this.text;
  getTextColor = (): string => this.textColor;
  getBgColor = (): string => this.bgColor;

  execute(inputs) {
    if (!this.onPressed) {
      return;
    }
    this.onPressed(inputs);
  }
}
