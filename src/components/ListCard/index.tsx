import { View, TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native'

interface ListCardProps extends TouchableOpacityProps {
  item: object;
}

export function ListCard({ item, ...rest }: ListCardProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonCard}
        {...rest}>
        {Object.values(item).map((data, index) => (
          <Text style={styles.textCard} key={index}>
            {index > 0 && data}
          </Text>
        ))}
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
  },
  buttonCard: {
    width: '100%',
    padding: 6,
    backgroundColor: '#969CB2',
    borderRadius: 10
  },
  textCard: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
    flexDirection: 'row',
  }
})




