import { SwipeDeleteAction } from "@repo/native-ui/components/base/swipe-delete-action";
import type { MappedContact } from "@repo/shared-logic/apis/base/account/get-user";
import type { FlashListProps } from "@shopify/flash-list";
import { FlashList } from "@shopify/flash-list";
import { ChevronRight } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { H3, XStack, YStack } from "tamagui";

const styles = StyleSheet.create({
  userItem: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderColor: "rgba(0, 0, 0, 0.07)",
    borderBottomWidth: 1,
    backgroundColor: "#FFFFFF",
  },
  userName: {
    color: "#161616",
    fontSize: 16,
    lineHeight: 16,
    fontWeight: 700,
  },
  userDetail: {
    color: "#161616",
    fontSize: 14,
  },
  statusLabel: {
    padding: 7,
    borderRadius: 5,
  },
});

export const UsersList = ({
  estimatedItemSize = 132,
  editUserHref,
  deleteUser,
  renderItem = ({ item }) => (
    <UsersListItem
      item={item}
      editUserHref={editUserHref}
      deleteUser={deleteUser}
    />
  ),
  ...delegated
}: Omit<FlashListProps<MappedContact>, "keyExtractor" | "renderItem"> &
  Partial<Pick<FlashListProps<MappedContact>, "renderItem">> & {
    readonly editUserHref: (userId: number) => string;
    readonly deleteUser: (userId: number) => Promise<void>;
  }) => {
  return (
    <FlashList
      keyExtractor={(contact) => contact.id.toString()}
      renderItem={renderItem}
      estimatedItemSize={estimatedItemSize}
      {...delegated}
    />
  );
};

export const UsersListItem = ({
  item,
  editUserHref,
  deleteUser,
}: {
  readonly item: MappedContact;
  readonly editUserHref: (userId: number) => string;
  readonly deleteUser: (userId: number) => Promise<void>;
}) => {
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);

  return (
    <Swipeable
      overshootRight={false}
      childrenContainerStyle={styles.userItem}
      renderRightActions={(progress, dragAnimatedValue) => (
        <SwipeDeleteAction
          title="Delete user"
          description="Are you sure you want to delete this record?"
          dragAnimatedValue={dragAnimatedValue}
          openConfirmationDialog={openRemoveDialog}
          setOpenConfirmationDialog={setOpenRemoveDialog}
          onConfirm={async () => {
            await deleteUser(item.id);

            setOpenRemoveDialog(false);
          }}
        />
      )}
    >
      <Link href={editUserHref(item.id)} asChild>
        <Pressable>
          <XStack justifyContent="space-between" alignItems="center">
            <YStack gap={10}>
              <XStack gap={4} alignItems="center">
                <H3 style={styles.userName}>
                  {item.firstName} {item.lastName}
                </H3>

                <View
                  style={StyleSheet.flatten([
                    styles.statusLabel,
                    {
                      backgroundColor:
                        item.status === "ACTIVE"
                          ? "rgba(229, 251, 235, 0.80)"
                          : "#FEECEE",
                    },
                  ])}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: item.status === "ACTIVE" ? "#236E4A" : "#AA2429",
                    }}
                  >
                    {item.status === "ACTIVE" ? "Active" : "Inactive"}
                  </Text>
                </View>
              </XStack>

              <Text style={styles.userDetail}>
                {item.permission === "ADMIN" ? "Administrator" : "Buyer"}
              </Text>

              <Text style={styles.userDetail}>{item.email}</Text>
            </YStack>

            <ChevronRight size={20} color="#000000" opacity={0.439} />
          </XStack>
        </Pressable>
      </Link>
    </Swipeable>
  );
};
