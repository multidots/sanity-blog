import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './documents/categoryType'
import { postType } from './documents/postType'
import { authorType } from './documents/authorType'
import { heroType } from './blocks/heroType'
import { ctaBlockType } from './blocks/ctaType'
import { tableType } from './blocks/tableType';
import { highlightBlockType } from './blocks/highlightBlockType';
import { imageTextSection } from './blocks/imageTextType';
import { clientList } from './blocks/clientListType';
import { serviceType } from './blocks/serviceType';
import { seoType } from './seoType';
import siteSettings from './documents/siteSettings';
import { pageType } from './documents/pageType';
import { pageBuilderType } from './pageBuilderType'
import { testimonialSlider } from './blocks/testimonialSliderType'
import { teamType } from './blocks/teamType'
import { addressType } from './blocks/addressType'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType, categoryType, postType, authorType,
    heroType, ctaBlockType, tableType,
    highlightBlockType, imageTextSection,
    clientList, serviceType, seoType, siteSettings, pageType, pageBuilderType, testimonialSlider, teamType, addressType
  ],
}
