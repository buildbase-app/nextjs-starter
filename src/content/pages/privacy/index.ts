import { allPrivacyPages } from 'contentlayer/generated';
import { createPageLoader } from '../page-loader';

export const privacy = createPageLoader(allPrivacyPages);
