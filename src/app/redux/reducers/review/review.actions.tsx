import ITypesReview from './review.types';

export const AddReviewActionStart = (reviewParams: any) => ({
  type: ITypesReview.ADD_REVIEW,
  payload: reviewParams,
});
