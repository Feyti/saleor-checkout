FROM node:16
WORKDIR /app

# Setup pnpm package manager
RUN npm install -g pnpm

# Setup proxy to API used in saleor-platform
# shall add the proxy server typicaly nginx one
# copy the configuration files

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

RUN pnpm install
COPY . .

EXPOSE 8001
CMD pnpm dev