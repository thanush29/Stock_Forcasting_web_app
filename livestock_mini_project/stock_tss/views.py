from django.shortcuts import render
import requests

# Create your views here.
def index(request):
    name = 'Stock_TSS'
    stock_name = 'IBM'
    time_frame = '1D'
    if 'stockname' in request.POST:
        stock_name = request.POST['stockname']
        print(stock_name)
    if '1min' in request.POST:
        time_frame = '1min'
    elif '5min' in request.POST:
        time_frame = '5min'
    elif '15min' in request.POST:
        time_frame = '15min'
    elif '60min' in request.POST:
        time_frame = '60min'
    elif '30min' in request.POST:
        time_frame = '30min'
    elif '1D' in request.POST:
        time_frame = '1D'
    elif '1W' in request.POST:
        time_frame = '1W'
    elif '1M' in request.POST:
        time_frame = '1M'
    def get_stock_data(stock_name, time_frame):
        if time_frame in ('1min','5min','15min','60min'):
            URL = 'https://www.alphavantage.co/query'
            PARAMS = {'function':'TIME_SERIES_INTRADAY',
                'symbol':stock_name,
                'interval':time_frame,
                'apikey':'demo'
                }
            time_frame_string = 'Time Series ('+ time_frame +')'
        elif time_frame in ('1D'):
            URL = 'https://www.alphavantage.co/query'
            PARAMS = {'function':'TIME_SERIES_DAILY',
                'symbol':stock_name,
                'apikey':'demo'
                }
            time_frame_string = 'Time Series (Daily)'
        elif time_frame in ('1W'):
            URL = 'https://www.alphavantage.co/query'
            PARAMS = {'function':'TIME_SERIES_WEEKLY',
                'symbol':stock_name,
                'apikey':'demo'
                }
            time_frame_string = 'Weekly Time Series'
        elif time_frame in ('1M'):
            URL = 'https://www.alphavantage.co/query'
            PARAMS = {'function':'TIME_SERIES_MONTHLY',
                'symbol':stock_name,
                'apikey':'demo'
                }
            time_frame_string = 'Monthly Time Series'
        req = requests.get(url=URL, params = PARAMS)
        data = req.json()
        print(data)
        stock_data = data[time_frame_string]
        data_keys = list(data[time_frame_string].keys())
        dataset =[]
        for cnt, item in enumerate(data[time_frame_string]):
            sets = {'label': data_keys[cnt],
                    'y':[round(float(data[time_frame_string][item]['1. open']),2),
                     round(float(data[time_frame_string][item]['2. high']),2),
                     round(float(data[time_frame_string][item]['3. low']),2),
                     round(float(data[time_frame_string][item]['4. close']),2)]
                     }
            dataset.append(sets)
        return dataset[::-1]
    dataset = get_stock_data(stock_name,time_frame)
    return render(request, 'stock_tss/index.html', {'name':name,
                                                 'stockname': stock_name,
                                                 'time_frame':time_frame,
                                                 'data':dataset[-30:]})