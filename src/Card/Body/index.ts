import { Content } from './Content';
import { Body, type BodyComponent } from './Body';

const CompoundBody = Body as BodyComponent;

CompoundBody.Content = Content;

export { CompoundBody as Body };
