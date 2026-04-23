import { allTermsPages } from 'contentlayer/generated';
import { createPageLoader } from '../page-loader';

export const terms = createPageLoader(allTermsPages);
