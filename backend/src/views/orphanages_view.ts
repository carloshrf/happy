import Orphanage from '../models/Orphanage';
import imagesView from './images_view';

export default {
  render(orphanage: Orphanage) {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      instructions: orphanage.instructions,
      about: orphanage.about,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      images: imagesView.renderMany(orphanage.images),
      whatsapp: orphanage.whatsapp,
    };
  },

  renderMany(orphanages: Orphanage[]){
    return orphanages.map(orphanage => this.render(orphanage))
  }
}