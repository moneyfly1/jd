import requests
import json
import time

'''
微信打开
http://www.rnrksyo.cn?masterid=oFFbU5nwJTuQRNsEWFWd5D6ynaW8
'''

ddjs = [
    {
        'unionid':'',
        'token':''
    },


]


def mian():
    cc = 1
    for i in ddjs:
        print("------------正在执行第" + str(cc) + "个账号----------------")
        unionid = i['unionid']
        token = i['token']
        shake(unionid, token)
        time.sleep(1)
        ye = Internet(unionid, token)
        withdraw_funds(unionid, token, ye)
        cc += 1

def shake(unionid, token):
    headers = {
        'unionid': unionid,
        'token': token,
        'user-agent': 'Mozilla/5.0 (Linux; Android 12; 2201122C Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/95.0.4638.74 Mobile Safari/537.36 uni-app Html5Plus/1.0 (Immersed/30.857143)',
        'Content-Type': 'application/json',
        'Host': 'www.frgxmle.cn',
    }
    body = json.dumps({"unionid":unionid})

    resp = requests.post('http://www.frgxmle.cn/user/activeone', headers=headers, data=body).json()
    if 'content' in resp:
        print('抖一抖:%s' % resp['content'])

def Internet(unionid, token):
    headers = {
        'unionid': unionid,
        'token': token,
        'user-agent': 'Mozilla/5.0 (Linux; Android 12; 2201122C Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/95.0.4638.74 Mobile Safari/537.36 uni-app Html5Plus/1.0 (Immersed/30.857143)',
        'Content-Type': 'application/json',
        'Host': 'www.frgxmle.cn',
    }
    body = json.dumps({"unionid":unionid})

    resp = requests.post('http://www.frgxmle.cn/user/getuseinfo', headers=headers, data=body).json()
    if 'result' in resp:
        yh = resp['result']['nickname']
        ye = resp['result']['money']
        cs = resp['result']['cashnum']
        sy = resp['result']['totalmoney']
        yq = resp['result']['lvone']
        qd = resp['result']['pinrest']
        kd = resp['result']['pinnow']
        yy = qd-kd
        print('用户名:%s' % yh, '\n剩余抖一抖次数:%s' % yy,'\n今日邀请人数:%s'% yq, '\n今日收益:%s' %sy, '\n余额:%s' % ye, '\n剩余提现次数%s' % cs)
        return ye

def withdraw_funds(unionid, token, ye):
    headers = {
        'unionid': unionid,
        'token': token,
        'user-agent': 'Mozilla/5.0 (Linux; Android 12; 2201122C Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/95.0.4638.74 Mobile Safari/537.36 uni-app Html5Plus/1.0 (Immersed/30.857143)',
        'Content-Type': 'application/json',
        'Host': 'www.frgxmle.cn',
    }
    if ye > 0:
        bb ={"unionid":unionid,"money":ye}
        bodys = json.dumps(bb)
        resp = requests.post('http://www.frgxmle.cn/trade/pushcash', headers=headers, data=bodys).json()
        if 'content' in resp:
            print('提现:%s' % resp['content'])
    else:
      print('提现:余额不足本次不提现')



if __name__ == '__main__':
    mian()
