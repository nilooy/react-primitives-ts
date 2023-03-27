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
  StyleSheet,
  View,
  Text,
  Image,
  Easing,
  Animated,
  Platform: {
    OS: Platform.OS,
    Version: Platform.Version,
  },
  Dimensions,
  Touchable: TouchableWithoutFeedback,
});
