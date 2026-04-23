import { allAboutPages } from 'contentlayer/generated';
import { createPageLoader } from '../page-loader';

export const about = createPageLoader(allAboutPages);
