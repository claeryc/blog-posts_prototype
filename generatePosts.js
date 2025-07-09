const fs = require("fs");
const matter = require("gray-matter");
const { marked } = require("marked");

const folder = "./blog-posts";
const outputDir = "./public/posts";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(folder);
const posts = [];

files.forEach((filename) => {
  const content = fs.readFileSync(`${folder}/${filename}`, "utf-8");
  const { data, content: markdown } = matter(content);

  const slug = data.slug || filename.replace(".md", "");
  const htmlContent = marked(markdown);

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>${data.title}</title>
      <style>
        body { font-family: sans-serif; max-width: 800px; margin: 2rem auto; padding: 1rem; }
        img { max-width: 100%; }
      </style>
    </head>
    <body>
      <h1>${data.title}</h1>
      <p><em>${new Date(data.date).toLocaleDateString()}</em></p>
      <img src="${data.thumbnail}" alt="${data.title}" />
      <p><strong>${data.description}</strong></p>
      <hr />
      <article>${htmlContent}</article>
      <br />
      <a href="/">← Back to Blog</a>
    </body>
    </html>
  `;

  fs.writeFileSync(`${outputDir}/${slug}.html`, html);
  posts.push({ ...data, slug });
});

// Save metadata for preview cards
posts.sort((a, b) => new Date(b.date) - new Date(a.date));
fs.writeFileSync("public/posts.json", JSON.stringify(posts, null, 2));