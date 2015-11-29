from apscheduler.schedulers.blocking import BlockingScheduler
import raven
import newsreader

ravenClient = raven.Client(dsn='https://85db503b6be040a2942ffb3a24577b14:ab5fe479abe540f4817f2e13e4ed6e95@app.getsentry.com/49850')

scheduler = BlockingScheduler()


@scheduler.scheduled_job(trigger='cron', minute='0,30')
def fetch_news_job():
  try:
    newsreader.get_news()
    newsreader.write_distances_json()
  except:
    ravenClient.captureException()

@scheduler.scheduled_job(trigger='cron', hour='3')
def retrain_classifier_job():
  # TODO really fetch new bundestag data and retrain classifier
  try:
    0
  except:
    ravenClient.captureException()

print('Starting jobs')
scheduler.start()
