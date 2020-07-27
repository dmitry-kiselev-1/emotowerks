export abstract class BaseComponent {

  protected loading: boolean = true;

  constructor() {}

  protected handleError(error) {
    console.error(error);
  }

}

