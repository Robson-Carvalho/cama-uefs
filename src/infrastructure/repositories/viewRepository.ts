import { ViewModel } from "../../core/domain/entities/View";

class ViewRepository {
  async incrementViews(): Promise<number> {
    const result = await ViewModel.findOneAndUpdate(
      {},
      { $inc: { views: 1 } },
      { new: true, upsert: true }
    );

    return result.views;
  }
}

export { ViewRepository };
