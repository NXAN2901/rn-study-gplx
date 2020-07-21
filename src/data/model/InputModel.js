export default class InputModel {
  constructor(
    title: string,
    placeholder: string,
    inputType: string,
    text: string
  ) {
    this.title = title;
    this.placeholder = placeholder;
    this.inputType = inputType;
    this.text = text;
  }

  getTitle = () => this.title;
  getPlaceHolder = () => this.placeholder;
  getInputType = () => this.inputType;
  getText = () => this.text;

  setText = text => {
    this.text = text;
  };
}

