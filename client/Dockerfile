# Node.js LTSイメージを指定
FROM node:lts

# 作業ディレクトリ設定
WORKDIR /usr/src/app

# まず package.json と package-lock.json だけコピー（npm install効率化のため）
COPY package*.json ./

# 依存関係をインストール（devDependenciesも含む）
RUN npm install

# ソースコードをコピー
COPY . .

# Next.jsの開発モードで起動（3000番ポート解放）
EXPOSE 3000
CMD ["npm", "run", "dev"]
