/**
 * A common findOneOrCreate plugin for all models.
 * @type {Function}
 */
export default function findOneOrCreatePlugin(schema) {
  schema.statics.findOneOrCreate = function (condition, doc, callback) {
    const self = this;
    self.findOne(condition, (outError, outResult) => {
      if (outError) {
        callback(outError);
      } else if (outResult) {
        callback(outError, outResult);
      } else {
        self.create(doc, (innerError, innerResult) => {
          callback(innerError, innerResult);
        });
      }
    });
  };
}
