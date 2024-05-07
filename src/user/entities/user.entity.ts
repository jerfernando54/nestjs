
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose" 

@Schema()
export class User extends Document {

  @Prop({
    required: true,
    index: true,
    minlength: 4
  })
  name: string
  
  @Prop({
    unique: true,
    index: true,
    required: true,
    minlength: 5,
  })
  email: string

  @Prop({
    index: true,
    required: true,
  })
  rol: string
  
  @Prop({
    required: true,
    minlength: 5
  })
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User);