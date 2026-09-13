migrate((app) => {
  const editors = new Collection({
    type: "auth",
    name: "editors",
    listRule: null,
    viewRule: "id = @request.auth.id",
    createRule: null,
    updateRule: "id = @request.auth.id",
    deleteRule: null,
    authRule: "role = 'content_admin'",
    manageRule: null,
    fields: [
      { type: "text", name: "username", required: true, min: 3, max: 64, pattern: "^[a-zA-Z0-9._-]+$", presentable: true },
      { type: "select", name: "role", required: true, maxSelect: 1, values: ["content_admin"] }
    ],
    indexes: [
      "CREATE UNIQUE INDEX idx_editors_username ON editors (username)"
    ],
    passwordAuth: {
      enabled: true,
      identityFields: ["username"]
    },
    authToken: { duration: 43200 }
  })
  app.save(editors)

  const adminRule = "@request.auth.role = 'content_admin'"
  const publicRule = "published = true || " + adminRule
  const content = new Collection({
    type: "base",
    name: "content_items",
    listRule: publicRule,
    viewRule: publicRule,
    createRule: adminRule,
    updateRule: adminRule,
    deleteRule: adminRule,
    fields: [
      { type: "select", name: "kind", required: true, maxSelect: 1, values: ["news", "gallery", "result"] },
      { type: "text", name: "slug", required: true, min: 1, max: 160, pattern: "^[a-z0-9-]+$" },
      { type: "text", name: "title_bg", max: 300 },
      { type: "text", name: "title_ru", max: 300 },
      { type: "text", name: "title_en", max: 300 },
      { type: "editor", name: "body_bg", maxSize: 12000 },
      { type: "editor", name: "body_ru", maxSize: 12000 },
      { type: "editor", name: "body_en", maxSize: 12000 },
      { type: "file", name: "image", maxSelect: 1, maxSize: 10485760, mimeTypes: ["image/jpeg", "image/png", "image/webp"], thumbs: ["640x480", "1200x900"] },
      { type: "url", name: "image_url" },
      { type: "select", name: "category_slug", maxSelect: 1, values: ["training", "tournaments", "kids", "adults"] },
      { type: "date", name: "event_date" },
      { type: "bool", name: "published" },
      { type: "number", name: "sort_order", min: 0, max: 100000, onlyInt: true },
      { type: "text", name: "competition_name", max: 300 },
      { type: "text", name: "competition_location", max: 200 },
      { type: "number", name: "gold_count", min: 0, max: 10000, onlyInt: true },
      { type: "number", name: "silver_count", min: 0, max: 10000, onlyInt: true },
      { type: "number", name: "bronze_count", min: 0, max: 10000, onlyInt: true }
    ],
    indexes: [
      "CREATE UNIQUE INDEX idx_content_items_slug ON content_items (slug)",
      "CREATE INDEX idx_content_items_public ON content_items (kind, published, sort_order, event_date)"
    ]
  })
  app.save(content)
}, (app) => {
  try { app.delete(app.findCollectionByNameOrId("content_items")) } catch (_) {}
  try { app.delete(app.findCollectionByNameOrId("editors")) } catch (_) {}
})