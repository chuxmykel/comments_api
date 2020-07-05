import {
  ISanitize,
  IMd5,
  ISourceFactory,
  ISource,
  IId,
  IComment,
} from "../../interfaces/interfaces.ts";

export default class Comment implements IComment {
  private _sanitizedText: string;
  private _deletedText: string = ".xX This comment has been deleted Xx.";
  private _validSource: ISource;
  constructor(
    private _id: string,
    private _author: string,
    private _createdOn: Date = new Date(Date.now()),
    private _source: ISource,
    private _modifiedOn: Date = new Date(Date.now()),
    private _postId: string,
    private _published: boolean = false,
    private _replyToId: string | undefined,
    private _text: string,
    private Id: IId,
    private md5: IMd5,
    private sanitize: ISanitize,
    private sourceFactory: ISourceFactory,
  ) {
    if (!this.Id.isValidId(this._id)) {
      throw new Error("Comment must have a valid id.");
    }

    if (this._author.length < 2) {
      throw new Error(
        "Comment author's name must be longer than 2 characters.",
      );
    }

    if (this._text.length < 1) {
      throw new Error("Comment must include at least one character of text.");
    }

    if (
      this._replyToId && !this.Id.isValidId(this._replyToId)
    ) {
      throw new Error("If supplied. Comment must contain a valid replyToId.");
    }

    this._sanitizedText = this.sanitize(this._text).trim();

    if (this._sanitizedText.length < 1) {
      throw new Error("Comment contains no usable text.");
    }

    this._validSource = this.sourceFactory.makeSource(
      this._source.ip,
      this._source.browser,
      this._source.referrer,
    );
  }

  private makeHash(): string {
    return this.md5(
      this._sanitizedText + this._author + this._postId +
        this._replyToId,
    );
  }

  get id(): string {
    return this._id;
  }

  get author(): string {
    return this._author;
  }

  get createdOn(): Date {
    return this._createdOn;
  }

  get hash(): string {
    return this.makeHash();
  }

  get modifiedOn(): Date {
    return this._modifiedOn;
  }

  get postId(): string {
    return this._postId;
  }

  get replyToId(): string | undefined {
    return this._replyToId;
  }

  get source(): ISource {
    return this._validSource;
  }

  get text(): string {
    return this._sanitizedText;
  }

  get isDeleted(): boolean {
    return this._sanitizedText === this._deletedText;
  }

  get isPublished(): boolean {
    return this._published;
  }

  markDeleted(): void {
    this._sanitizedText = this._deletedText;
    this._author = "deleted";
  }

  publish(): void {
    this._published = true;
  }

  unPublish(): void {
    this._published = false;
  }
}
