FROM python:3.11-alpine

# Create app directory
WORKDIR /backend

# System deps:
RUN pip install --no-cache-dir "poetry==$POETRY_VERSION"

# Copy only requirements to cache them in docker layer
COPY poetry.lock pyproject.toml ./

# Project initialization:
RUN poetry config virtualenvs.create false \
    && poetry install --no-dev

# Copy project
COPY . .

# Expose port
EXPOSE 5001

# Run app
CMD ["gunicorn", "--bind", "0.0.0.0:5001", "src.__init__:app"]