import ReactPrimitives from '../ReactPrimitives'
import {
  Animated,
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Easing,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native'

ReactPrimitives.inject({
  View,
  Text,
  Image,
  Easing,
  Animated,
  StyleSheet,
  Platform: {
    OS: Platform.OS,
    Version: Platform.Version,
  },
  Dimensions,
  Touchable: TouchableWithoutFeedback,
});
