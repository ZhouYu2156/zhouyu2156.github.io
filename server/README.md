
## 安装最新 Django

```bash
$ python -m pip install Django
```

- 查看 `django` 版本

```bash
$ python -m django --version
```

```python
import django

print(django.get_version())
```

## 创建项目

```bash
$ django-admin startproject myapp [project_name]
```

## 启动项目

```bash
$ python manage.py runserver [0.0.0.0:8000]
```

## 新建应用

```bash
$ python manage.py startapp app_name
```

## 迁移数据库 & 创建用户

- 迁移数据库

```bash
$ python manage.py migrate
```

- 创建用户

```bash
$ python manage.py createsuperuser --username admin --email admin@qq.com 
```

DRF

函数视图：`@api_view`
类视图：`APIView`
通用视图：`GenericAPIView`
视图集：`ViewSet`
自动路由注册：`DefaultRouter`

认证权限系统：Session、Token、JWT、Basic