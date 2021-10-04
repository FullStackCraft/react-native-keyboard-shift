/// <reference types="react" />
import { ViewProps } from 'react-native';
interface Props extends ViewProps {
    hasHeader?: boolean;
    headerOffset?: number;
    children: any;
}
export default function KeyboardShift(props: Props): JSX.Element;
export {};
