FROM python:3 AS spo
WORKDIR /opt/
COPY spo-parser/requirements.txt .
RUN apt-get update \
	&& apt-get install -y libgl1 ghostscript \
	&& pip install -r requirements.txt

ARG NEXT_PUBLIC_GUEST_ONLY
ENV NEXT_PUBLIC_GUEST_ONLY $NEXT_PUBLIC_GUEST_ONLY
COPY spo-parser/ .
RUN ./run_extraction.sh



FROM python:3 AS distances
WORKDIR /opt/

COPY room-distances .
RUN pip install -r requirements.txt \
	&& python3 calculate-distances.py



FROM python:3 as courses
WORKDIR /opt/
ARG THI_ICAL_USER
ARG THI_ICAL_SESSION
ENV THI_ICAL_USER $THI_ICAL_USER
ENV THI_ICAL_SESSION $THI_ICAL_SESSION

COPY course-downloader .
RUN pip install -r requirements.txt \
	&& python3 obtain_course_list.py



FROM alekzonder/puppeteer:latest AS pwaicons
USER root
WORKDIR /opt/
COPY rogue-thi-app/public/favicon.svg .
RUN mkdir ./splash && npx pwa-asset-generator --no-sandbox=true --path-override '/' --xhtml --favicon --dark-mode favicon.svg ./splash/



FROM node:16

WORKDIR /opt/next

ARG NEXT_PUBLIC_HACKERMAN_FLAGS
ARG NEXT_PUBLIC_ELECTION_URL
ARG NEXT_PUBLIC_GUEST_ONLY
ENV NEXT_PUBLIC_HACKERMAN_FLAGS $NEXT_PUBLIC_HACKERMAN_FLAGS
ENV NEXT_PUBLIC_ELECTION_URL $NEXT_PUBLIC_ELECTION_URL
ENV NEXT_PUBLIC_GUEST_ONLY $NEXT_PUBLIC_GUEST_ONLY

COPY rogue-thi-app/package.json rogue-thi-app/package-lock.json ./
RUN npm install
COPY rogue-thi-app/ .
COPY --from=spo /opt/spo-grade-weights.json data/
COPY --from=distances /opt/room-distances.json data/
COPY --from=courses /opt/ical-courses.json data/
COPY --from=pwaicons /opt/splash/ public/

RUN npm run build

USER node
EXPOSE 3000
CMD ["npm", "start"]