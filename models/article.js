const mongoose = require("mongoose");
const { marked } = require("marked");
const { mangle } = require("marked-mangle");
const { gfmHeadingId } = require("marked-gfm-heading-id");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);
marked.use(mangle());
const options = {
  prefix: "my-prefix-"
};
marked.use(gfmHeadingId(options));
const articleSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  description: {
    type: String
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
});

articleSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
  }
  next();
});
module.exports = mongoose.model("Article", articleSchema);
