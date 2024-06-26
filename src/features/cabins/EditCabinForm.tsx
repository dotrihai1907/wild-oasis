import { useForm } from "react-hook-form";
import { ICabin, ICreateCabin } from "../../services/apiModel";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { useEditCabin } from "./useEditCabin";

type EditCabinFormProps = {
  editCabin: ICabin;
  onClose?: () => void;
};

const EditCabinForm = ({ editCabin, onClose }: EditCabinFormProps) => {
  const { id, ...editValues } = editCabin;

  const { register, handleSubmit, getValues, formState } =
    useForm<ICreateCabin>({
      defaultValues: editValues,
    });

  const { errors } = formState;

  const { isEditing, editAction } = useEditCabin();

  const onSubmit = (data: ICreateCabin) => {
    editAction(
      { newCabin: data, id },
      {
        onSuccess: () => onClose?.(),
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      <FormRow id="name" label="Cabin name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isEditing}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        id="maxCapacity"
        label="Maximum capacity"
        error={errors.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isEditing}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        id="regularPrice"
        label="Regular price"
        error={errors.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isEditing}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow id="discount" label="Discount" error={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isEditing}
          {...register("discount", {
            required: "This field is required",
            min: {
              value: 0,
              message: "Discount should be at least 0",
            },
            validate: (value) =>
              Number(value) <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow id="description" label="Description for website">
        <Textarea
          id="description"
          defaultValue=""
          disabled={isEditing}
          {...register("description")}
        />
      </FormRow>

      <FormRow id="image" label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isEditing}
          {...register("image")}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={onClose}
          disabled={isEditing}
        >
          Cancel
        </Button>
        <Button disabled={isEditing}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
};

export default EditCabinForm;
