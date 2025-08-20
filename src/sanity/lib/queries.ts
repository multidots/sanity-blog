import { defineQuery } from 'next-sanity'

export const HEADER_QUERY = defineQuery(`*[_type == "siteSettings" && _id == "siteSettings"][0]{ 
  siteTitle,
  logo,
  scheduleCallTitle,
  scheduleCallUrl,
  menuItems[] {
    title,
    url,
    openInNewTab,
  },
  }`);
export const FOOTER_QUERY = defineQuery(`*[_type == "siteSettings" && _id == "siteSettings"][0]{
  footer }`);

export const HOME_PAGE_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
    _id,
    _type,
    title,
    "slug": slug.current,
    hideHeader,
    hideFooter,
  homePage->{
    ...,
    "seo": {
    "title": coalesce(seo.title, title, ""),
     "description": coalesce(seo.description,  ""),
    "image": seo.image,
    "noIndex": seo.noIndex == true
  },
    content[]{
      ...,
    }      
  }
}`);
export const PAGE_QUERY = defineQuery(`*[_type=="page" && slug.current == $slug][0]{
   _id,
    _type,
    title,
    "slug": slug.current,
    content[]{
      ...,
    },
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description, ""),
      "image": seo.image,
      "noIndex": seo.noIndex == true
    },
    hideHeader,
    hideFooter
}`);

export const SITEMAP_QUERY = defineQuery(`
  *[_type in ["page", "post"] && defined(slug.current)] {
      "href": select(
        _type == "page" => "/" + slug.current,
        _type == "post" => "/posts/" + slug.current,
        slug.current
      ),
      _updatedAt
  }
  `)
export const POSTS_QUERY = defineQuery(`* [_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  categories[]->{
    _id,
    title
  },
  author->{
    _id,
    name,
    slug,
    image
  },
  "categories": categories[]->title,
  _type // Add this line
}[$start...$end]`)
export const POSTS_COUNT_QUERY = defineQuery(`count(*[_type == "post"])`);

export const SINGLE_POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    "author": author-> { name, image, bio, socialLinks },
    mainImage { asset->, alt },
    categories[]-> { title },
    publishedAt,
    body[]{
      ...,
    },
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description, description, ""),
      "image": seo.image,
      "noIndex": seo.noIndex == true
    }
  }
`);
export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    blogPostsPerPage,
    blogPageCTA {
      heading,
      subheading,
      button {
        text,
        link,
        openInNewTab
      },
      backgroundType,
      backgroundImage,
      backgroundColor,
      textColor
    }
  }
`);