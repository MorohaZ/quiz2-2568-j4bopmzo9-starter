import { useState } from "react";
import {
  Modal,
  TextInput,
  NumberInput,
  Select,
  Button,
  Stack,
  Group
} from "@mantine/core";
import { v4 as uuidv4 } from "uuid";

type AddFoodModalProps = {
  opened: boolean;
  onClose: () => void;
  onAdd: (
    id : string,
    name: string,
    price: number | string,
    quantity: number | string,
    category: string
  ) => void;
};

export default function AddFoodModal({
  opened: openedProp,
  onClose,
  onAdd
}: AddFoodModalProps) {
  const [internalOpened, setInternalOpened] = useState(false);
  const opened = typeof openedProp === "boolean"?openedProp:internalOpened;

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | string>(0);
  const [quantity, setQuantity] = useState<number | string>(0);
  const [category, setCategory] = useState<string | null>(null);


  const [errors, setErrors] = useState<{
    name?: string;
    price?: string;
    quantity?: string;
    category?: string;
  }>({});
  const resetFrom = () => {
    setName("");
    setPrice(0);
    setQuantity(0);
    setCategory(null);
    setErrors({});
  };

  const closeModal = () => {
    if(typeof openedProp !== "boolean"){
      setInternalOpened(false);
    };
    if(onClose){onClose();};
  };

  const handleOpend = () => {
    if(typeof openedProp !== "boolean"){
      setInternalOpened(true);
    };
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!name || name.trim() === "") {
      e.name = "กรุณากรอกชื่ออาหาร";
    };
    if (price === null || Number.isNaN(price) || Number(price) <= 0) {
      e.price = "กรุณากรอกราคาที่มากกว่า 0";
    };
    if (quantity === null || Number.isNaN(quantity) || Number(quantity) <= 0) {
      e.quantity = "กรุณากรอกจำนวนอย่างน้อย 1";
    };
    if (!category) {
      e.category = "กรุณาเลือกหมวดหมู่";
    };
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () =>{
    if (validate()) {return;};
    const id = uuidv4();
    const priceNum = Number(price);
    const quantityNum = Number(quantity);
     onAdd(id,name, priceNum, quantityNum, category as string);
     resetFrom();
     closeModal(); 
  };
  // หากต้องการแปง type string เป็น type number สามารถดูตัวอย่างนี้ได้
  // let val_number: number = Number("500.0");
  // console.log(val_number + 100); // 600.0

  return (

  
    <Button onClick={handleOpend}>เพิ่มรายการอาหาร<Button/>

    <Modal  
      opened={opened}
      onClose={closeModal}
      title="เพิ่มรายการอาหาร"
      centered
    >
      
      <Stack>
        <TextInput 
        label = "ชื่ออาหาร"
        placeholder="เช่น ข้าวมันไก่"
        value={name}
        onChange = {(e) => setName(e.currentTarget.value)}
        error={errors.name}
        />

        <NumberInput
        label = " ราคา (บาท)"
        placeholder="เช่น 50"
        min={0}
        value={price}
        onChange = {(val) => setPrice(val ?? null)}
        error={errors.price}
        />

        <NumberInput
        label = " จำนวนที่สั่ง"
        placeholder="เช่น 1"
        min={1}
        value={quantity}
        onChange = {(val) => setQuantity(val !== null ? Math.trunc(val ) : null)}
        error={errors.quantity}
        />
        
        <Select
          label=" หมวดหมู่"
          placeholder="เลือกหมวดหมู่"
          data={["Main Course", "Drink", "Dessert"]}
          value={category}
          onChange={setCategory}
          error={errors.category}
        />
        
        <Group  mt="md">
          <Button variant="default" onClick={() => {resetFrom();closeModal();}}>
            ยกเลิก
            </Button>
          <Button onClick={handleSubmit}>บันทึก</Button>
          </Group>
        </Stack>
    </Modal>  
  </>
  );
}
