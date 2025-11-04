import os
import json
import logging
import azure.functions as func
import requests

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="predict", methods=["POST"])
def predict(req: func.HttpRequest) -> func.HttpResponse:
    """Välittää kuvatiedoston Azure Custom Vision -palveluun ja palauttaa tuloksen"""
    try:
        pred_url = os.environ["PREDICTION_URL"].strip()
        pred_key = os.environ["PREDICTION_KEY"].strip()

        body = req.get_body()
        if not body:
            return func.HttpResponse(
                json.dumps({"error": "Tyhjä pyyntö – lähetä kuvatiedosto (raw binarynä)."}),
                status_code=400,
                mimetype="application/json"
            )

        headers = {
            "Prediction-Key": pred_key,
            "Content-Type": "application/octet-stream"
        }

        r = requests.post(pred_url, headers=headers, data=body, timeout=15)
        return func.HttpResponse(r.text, status_code=r.status_code, mimetype="application/json")

    except Exception as e:
        logging.exception("Predict-virhe")
        return func.HttpResponse(
            json.dumps({"error": str(e)}),
            status_code=500,
            mimetype="application/json"
        )
