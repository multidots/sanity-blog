import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      S.listItem()
        .title('Pages')
        .schemaType('page')
        .child(
          S.documentTypeList('page')
            .title('Pages')
            .defaultOrdering([{field: 'title', direction: 'asc'}])
        ),
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('Posts')
                .schemaType('post')
                .child(
                  S.documentTypeList('post')
                    .title('Posts')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('Categories')
                .schemaType('category')
                .child(
                  S.documentTypeList('category')
                    .title('Categories')
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
                ),
              S.listItem()
                .title('Authors')
                .schemaType('author')
                .child(
                  S.documentTypeList('author')
                    .title('Authors')
                    .defaultOrdering([{field: 'name', direction: 'asc'}])
                ),
            ])
        ),
      S.divider(),
      // Fallback: any remaining document types not explicitly listed above
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['siteSettings', 'page', 'post', 'category', 'author'].includes(item.getId()!),
      ),
    ])
