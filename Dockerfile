# Stage 1: Build the Next.js application
FROM node:20 AS build
WORKDIR /app

# Copy package.json và package-lock.json nếu có
COPY package.json package-lock.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Build ứng dụng Next.js
RUN npm run build

# Stage 2: Run the Next.js application
FROM node:20 AS runner
WORKDIR /app

# Chỉ copy những file cần thiết từ giai đoạn build
COPY --from=build /app/package.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

# Mở cổng 3000 (Next.js mặc định chạy trên cổng này)
EXPOSE 3000

# Chạy ứng dụng Next.js
CMD ["npm", "start"]
