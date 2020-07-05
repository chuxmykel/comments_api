import {
  IComment,
  ICommentsRepository,
  IDataBaseFactory,
  ICommentFactory,
  ISourceFactory,
  ISource,
} from "../../interfaces/interfaces.ts";

export class CommentsRepository implements ICommentsRepository {
  constructor(
    private _commentFactory: ICommentFactory,
    private _sourceFactory: ISourceFactory,
    private _dataBaseFactory: IDataBaseFactory,
  ) {}

  public async findByHash(hash: string): Promise<IComment | null> {
    const dataBase = await this._dataBaseFactory.makeDataBase();
    const comments = await dataBase.query(
      `SELECT * FROM "Comments" WHERE hash = $1`,
      hash,
    );

    if (comments.rows.length < 1) {
      return null;
    }

    // Transform the optput from the database query to suitable data for out use case
    let commentDetails: any = {};
    comments.rowDescription.columns.map((column: any, index: number) => {
      commentDetails[column.name] = comments.rows[0][index];
    });

    const source: ISource = this._sourceFactory.makeSource(
      JSON.parse(commentDetails.source)._ip,
      JSON.parse(commentDetails.source)._browser,
      JSON.parse(commentDetails.source)._referrer,
    );

    const foundComment: IComment = this._commentFactory.makeComment(
      commentDetails.author,
      source,
      commentDetails.postId,
      commentDetails.text,
      commentDetails.replyToId,
      commentDetails.id,
      commentDetails.published,
      commentDetails.createdOn,
      commentDetails.modifiedOn,
    );

    return foundComment;
  }

  public async insert(commentDetails: IComment): Promise<IComment> {
    const {
      id,
      author,
      createdOn,
      source,
      modifiedOn,
      postId,
      isPublished,
      replyToId,
      text,
      hash,
    } = commentDetails;
    const dataBase = await this._dataBaseFactory.makeDataBase();
    await dataBase.query(
      `INSERT INTO "Comments" (id, author,\
        "createdOn", source, "modifiedOn", "postId",\
        published, "replyToId", text, hash) VALUES ($1, $2,\
        $3, $4, $5, $6, $7, $8, $9, $10)`,
      id,
      author,
      createdOn,
      JSON.stringify(source),
      modifiedOn,
      postId,
      isPublished,
      replyToId,
      text,
      hash,
    );
    return commentDetails;
  }
}
