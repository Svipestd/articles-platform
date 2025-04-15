import { getArticleById } from './getArticleById/getArticleById';
import { getArticlesList } from './getArticlesList/getArticlesList';
import { getArticlesListByUserId } from './getArticlesListByUserId/getArticlesListByUserId';

export const ArticleAPI = {
  getArticlesList,
  getArticlesListByUserId,
  getArticleById,
};
