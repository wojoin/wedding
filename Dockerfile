# FROM node:13.12.0-alpine

# # set working directory
# WORKDIR /app

# ENV PATH /app/node_modules/.bin:/usr/local/bin/:$PATH

# ADD ./* /app/

# #RUN npm version
# #RUN npm install --force yarn -g
# #RUN yarn -v
# RUN yarn global add umi
# RUN which umi
# RUN umi -v
# #UN yarn install
# RUN npm install less-vars-to-js @umijs/preset-react -g
# #RUN npx browserslist@latest --update-db
# #RUN yarn add --force /app/package.json

# RUN npm install /app/package.json -g
# # add app

# EXPOSE 7000

# # start app
# CMD ["npm", "run", "start"]

FROM node:14-alpine AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
# COPY package.json .
# COPY yarn.lock .
# RUN yarn install
# RUN yarn add react-images react-photo-gallery react-image-gallery react-native react-native-snap-carousel
# RUN yarn add @ant-design/icons @lingui/react antd  axios classnames d3-shape draft-js draftjs-to-html draftjs-to-markdown
# RUN yarn add dva-model-extend echarts echarts-for-react echarts-gl echarts-liquidfill enquire-js highcharts-exporting highcharts-more           
# RUN yarn add json-format  lodash md5  nprogress path-to-regexp prop-types qs react-adsense react-countup react-draft-wysiwyg
# RUN yarn add react-helmet react-highcharts react-perfect-scrollbar recharts store  @babel/preset-react @lingui/cli @lingui/macro
# RUN yarn add @umijs/preset-react babel-eslint babel-plugin-dev-expression babel-plugin-import babel-plugin-macros babel-plugin-module-resolver cross-env
# RUN yarn add eslint eslint-config-react-app eslint-plugin-flowtype eslint-plugin-import eslint-plugin-jsx-a11y
# RUN yarn add eslint-plugin-react eslint-plugin-react-hooks husky less-vars-to-js lint-staged mockjs module moment prettier react-custom-scrollbars
# RUN yarn add stylelint stylelint-config-prettier stylelint-config-standard typescript umi
# Copy app files
COPY . .

RUN npm install

# Expose port
EXPOSE 7000
# Start the app
# CMD [ "yarn", "start" ]
CMD [ "npm", "run", "start" ]
