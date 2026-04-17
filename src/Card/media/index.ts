import { Media, MediaComponent } from './Media';
import { Image } from './Image';

// Attach subcomponents
const CompMedia = Media as MediaComponent;

CompMedia.Image = Image;

export { CompMedia };
