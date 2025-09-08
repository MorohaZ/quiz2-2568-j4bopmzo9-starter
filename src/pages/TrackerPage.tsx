import { useState } from "react";
import { Button, Stack, Title, Divider, Container } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";

type FoodItem = {
  id: string;
  name: string;
  price: number | string;
  quantity: number | string;
  category: string;
};

export default function FoodTracker() {
  const [opened, setOpened] = useState(false);
  const [items, setItems] = useState<FoodItem[]>([]);
  const categories = ["Main Course", "Drink", "Dessert"];

  return (
    <Container style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <Title order={2} mb="md">
        Food Tracker
      </Title>
      <Button>Add Food Item</Button>
      {/* Type additional AddFoodModal here. */
      
      }

      <Divider my="md" />
      {/* Type additional total cost here. */}
      <Title order={4}>Total cost: {} Baht</Title>
      <Stack my="sm">{/* Type additional text here. */}</Stack>

      <Divider my="md" />
      {/* Type additional card here. */}

      <Stack>{/* Type additional food card list here. */}</Stack>
    </Container>
  );
}
