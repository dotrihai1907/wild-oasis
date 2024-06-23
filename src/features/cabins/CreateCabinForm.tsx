import { useForm } from "react-hook-form";
import { ICreateCabin } from "../../services/apiModel";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { useCreateCabin } from "./useCreateCabin";

type CreateCabinFormProps = {
  onClose?: () => void;
};

const CreateCabinForm = ({ onClose }: CreateCabinFormProps) => {
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<ICreateCabin>();

  const { errors } = formState;

  const { isCreating, createAction } = useCreateCabin();

  const onSubmit = (data: ICreateCabin) => {
    createAction(data, {
      onSuccess: () => {
        reset();
        onClose?.();
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      <FormRow id="name" label="Cabin name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          {...register("description")}
        />
      </FormRow>

      <FormRow id="image" label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isCreating}
          {...register("image", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isCreating}>Create new cabin</Button>
      </FormRow>
    </Form>
  );
};

export default CreateCabinForm;
