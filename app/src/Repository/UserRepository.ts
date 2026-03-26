import { prisma } from "../config/prisma";
import { UsersModel } from "../models/UserModel";

export class UserRepository {
    private prisma = prisma;

    private normalizePhone(phone: string) {
        const value = phone.trim();

        if (value.length > 20) {
            throw new Error("Phone number must be 20 characters or fewer");
        }

        return value;
    }

    async GetAllUsers() {
        const users = await this.prisma.user.findMany({
            where: { isDeleted: false }
        });

        if (users.length === 0) {
            throw new Error("No Users Found")
        }

        return users;
    }

    async DeleteUser(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id }
        });

        if (!user || user.isDeleted) {
            throw new Error("No Users is Found")

        }

        return await this.prisma.user.update({
            where: { id },
            data: { isDeleted: true }
        });

    }

    async CreateAndUpdateUsers(data: UsersModel) {
        const phone = this.normalizePhone(data.phone);

        if (data.id) {

            const user = await this.prisma.user.findUnique({
                where: {
                    id: data.id,
                }
            });

            if (!user || user.isDeleted) {
                throw new Error("No Users is Found")
            }


            const emailExists = await this.prisma.user.findFirst({
                where: {
                    email: data.email,
                    NOT: { id: data.id }
                }
            });

            if (emailExists) {
                throw new Error("This Email already Exists")

            }
            return await this.prisma.user.update({
                where: { id: data.id },
                data: {
                    fullname: data.fullname,
                    email: data.email,
                    phone: phone,
                    bio: data.bio,
                    password: data.password,
                    resumeurl: data.resumeurl ?? null
                }
            });
        }


        const emailExists = await this.prisma.user.findUnique({
            where: { email: data.email }
        });

        if (emailExists) {
            throw new Error("this email is already exists")
        }

        return await this.prisma.user.create({
            data: {
                fullname: data.fullname,
                email: data.email,
                phone: phone,
                bio: data.bio,
                password: data.password,
                resumeurl: data.resumeurl ?? null
            }
        });

    }


    async GetSingleUser(id: number) {
        const users = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!users || users.isDeleted) {
            throw new Error("No Users is Found")

        }

        return users;
    }
}
