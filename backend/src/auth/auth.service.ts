// Auth service handles login logic

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) { }

  async login(email: string, password: string) {

    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    console.log("User from DB:", user);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    console.log("Entered password ->", `"${password}"`);
    console.log("Length ->", password.length);
    console.log("Stored hashed password:", user.password);

    // Compare password
    const isValid = await bcrypt.compare(password, user.password);

    console.log("Password match result:", isValid);

    if (!isValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // Generate JWT token
    const token = this.jwtService.sign({
      userId: user.id,
      role: user.role,
      country: user.country
    });

    return {
      access_token: token
    };
  }
}