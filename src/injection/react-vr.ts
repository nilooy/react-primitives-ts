import ReactPrimitives from '../ReactPrimitives'
import {
  Animated,
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Easing,
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
    OS: 'vr',
    Version: 1,
  },
  Touchable: require('../vr/Touchable')(
    Animated,
    StyleSheet,
    ReactPrimitives.Platform,
  ),
});
