import { ListItem, Icon } from "@rneui/themed";

const DepositListItem = ({data}) => {
  return <ListItem
    containerStyle={{ borderBottomWidth: 1, }}
  >
    <Icon name={iconFactory(data.category.iconId)} type="entypo" />
    <ListItem.Content>
      <ListItem.Title style={{ fontSize: 17 }} numberOfLines={1}>{data.concept}</ListItem.Title>
      <ListItem.Subtitle style={{ fontSize: 13 }} numberOfLines={1}>{data.category.name}</ListItem.Subtitle>
    </ListItem.Content>
    <ListItem.Content right>
      <ListItem.Title right numberOfLines={1} style={{color: 'green'}}>+{data.amount}</ListItem.Title>
      <ListItem.Subtitle style={{ fontSize: 12 }} right numberOfLines={1}>{data.date}</ListItem.Subtitle>
    </ListItem.Content>
  </ListItem>;
};

const iconFactory = (id) => {
  switch (id) {
    case 1:
      return "aircraft"
    case 2:
      return "drink"
    case 3:
      return "key"
    case 4:
      return "shopping-cart"
    case 5:
      return "clapperboard"
    case 6:
      return "squared-plus"
    case 7:
      return "man"
    case 8:
      return "open-book"
    default:
      return "credit"
  }
};

export default DepositListItem;
